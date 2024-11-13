import express from 'express';
import cors from 'cors'
import multer from 'multer';
import csvToJson from 'convert-csv-to-json';

const app = express();
const port = process.env.PORT || 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

let userData: Array<Record<string, string>> = []

app.use(cors());

app.post('/api/files', upload.single('file'), async (request, response) => {
  // 1. Extract the file from the request
  const { file } = request;
  // 2. Validate the file
  if (!file) {
    return response.status(500).json({
      message: 'File is required'
    })
  }
  // 3. Validate the mimetype
  if (file.mimetype !== 'text/csv') {
    return response.status(500).json({
      message: 'Invalid file type. It must be CSV'
    })
  }

  let json: Array<Record<string, string>> = []

  try {
  // 4. Transform el file (buffer) to string
    const csv = Buffer.from(file.buffer).toString('utf-8');

  // 5. Transform the string CSV to JSON
    json = csvToJson.fieldDelimiter(',').csvStringToJson(csv);
  } catch(error) {
    return response.status(500).json({
      message: 'An error ocurred while processing the file'
    })
  }
  // 6. Save the file in the database
    userData = json;
  // 7. Return 200 with the message an the json
  return response.status(200).json(
    { 
      data: userData,
      message: 'File uploaded successfully'
    }
  );

})

app.get('/api/users', async (request, response) => {
  // 1. Extract the query param `q` from the request
  const { q } = request.query;
  // 2. Validate the query param
  if (!q) {
    return response.status(500).json({
      message: 'Query param `q` is required'
    })
  }
  // 3. Filter the data from the database with the query param.
  const search = q.toString().toLowerCase();
  const filteredData = userData.filter((user) => {
    return Object
      .values(user)
      .some((value) => value.toLowerCase().includes(search))
  });
  // 4. Return 200 with the filtered data
  return response.status(200).json({  data: filteredData });
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})