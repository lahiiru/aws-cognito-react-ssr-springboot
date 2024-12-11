import {useEffect, useState} from "react";
import axios from "axios";

export function Welcome() {
  const [secretMessage, setSecretMessage] = useState();

  useEffect(() => {
    axios.get('/api/secure/hello').then((response) => {
      setSecretMessage(response.data?.message);
    })
  }, [axios]);

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <div className="max-w-[300px] w-full space-y-6 px-4">
          { secretMessage }
        </div>
      </div>
    </main>
  );
}
