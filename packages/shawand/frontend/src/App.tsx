import { useState } from 'react';
import { Toaster, toast } from 'sonner'

import './App.css'

import { upload } from './services/upload';
import { type Data } from './types';
import { Search } from './ui/search';

const APP_STATUS = {
  IDLE: 'IDLE',
  READY_UPLOAD: 'READY_UPLOAD',
  UPLOADING: 'UPLOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
} as const;

const BUTTON_TEXT = {
  [APP_STATUS.READY_UPLOAD]: 'Upload file',
  [APP_STATUS.UPLOADING]: 'Uploading...',
}

type AppStatusType = typeof APP_STATUS[keyof typeof APP_STATUS];

function App() {
  const [ appStatus, setAppStatus ] = useState<AppStatusType>(APP_STATUS.IDLE);
  const [ data, setData ] = useState<Data>([]);
  const [ file, setFile ] = useState<File | null>(null);

  const showButton = appStatus === APP_STATUS.READY_UPLOAD || appStatus === APP_STATUS.UPLOADING;
  const showInput = appStatus !== APP_STATUS.SUCCESS

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [ file ] = event.target.files ?? [];
    if (file) {
      setFile(file);
      setAppStatus(APP_STATUS.READY_UPLOAD);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (appStatus !== APP_STATUS.READY_UPLOAD || !file) {
      return;
    }

    setAppStatus(APP_STATUS.UPLOADING);

    const [err, newData] = await upload(file);

    console.log('New Data', newData);

    if (err) {
      setAppStatus(APP_STATUS.ERROR);
      toast.error(err.message);
      return;
    }

    setAppStatus(APP_STATUS.SUCCESS);

    if (newData) {
      setData(newData);
    }

    toast.success('File uploaded successfully');
  }

  return (
    <>
      <Toaster/>
      <h1>Challenge: Upload CSV + Search</h1>
      {showInput && (
        <form onSubmit={handleSubmit}>
          <label>
            <input
              disabled={appStatus === APP_STATUS.UPLOADING}
              onChange={handleInputChange}
              name="file"
              type="file"
              accept=".csv"
            />
          </label>
          {showButton && (
            <button
              disabled={appStatus === APP_STATUS.UPLOADING}
            >
              {BUTTON_TEXT[appStatus]}
            </button>
          )}
        </form> 
      )}

      {
        appStatus === APP_STATUS.SUCCESS && (
          <Search initialData={data}></Search>
        )
      }
    </>
  )
}

export default App
