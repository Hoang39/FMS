import axios from "axios";

export const getVehiclesList = async () => {
  const headers = {
    headers: {
      Authorization:
        'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyTG9naW4iOnsidXNlcl9uYW1lIjoicXVhbmd0dCIsInBhc3N3b3JkIjoiUTZzK3FrSjU1T3MwTmhyODJXRWYybExtaHFWYnNBeThCR2RiUSs1NUpcLzA9IiwibmFtZSI6IlRyXHUxZWE3biBUaGlcdTFlYzduIFF1YW5nIiwicm9sZV9pZCI6IjEiLCJkYXRhX2dyb3VwIjoiMTQzIiwic2VydmVyX2dyb3VwIjoiMCIsInVzZXJfZ3JvdXBfcGVybWlzaW9uX2lkIjoiMCIsImFkZHJlc3MiOiIwMSBwaFx1MWVkMSBcdTAxMTBcdTAwZjQsIE1cdTFlZjkgXHUwMTEwXHUxZWU5YywgSFx1MDBlMCBOXHUxZWQ5aSIsImlzX3N0YWZmIjoiMCIsIm1hbmFnZV91c2VyX25hbWUiOiJ4dWFuaHVuZyIsInRyYW5zZmVycmVkX2RhdGUiOm51bGwsImFnZW50IjpudWxsLCJvcGVyYXRpb25fdHlwZSI6InhlIHRcdTFlYTNpIiwicGljdHVyZSI6IiJ9LCJ0cmFuc2ZlcnJlZFVzZXIiOnsidXNlcl9uYW1lIjoicXVhbmd0dCIsInBhc3N3b3JkIjoiUTZzK3FrSjU1T3MwTmhyODJXRWYybExtaHFWYnNBeThCR2RiUSs1NUpcLzA9IiwibmFtZSI6IlRyXHUxZWE3biBUaGlcdTFlYzduIFF1YW5nIiwicm9sZV9pZCI6IjEiLCJkYXRhX2dyb3VwIjoiMTQzIiwic2VydmVyX2dyb3VwIjoiMCIsInVzZXJfZ3JvdXBfcGVybWlzaW9uX2lkIjoiMCIsImFkZHJlc3MiOiIwMSBwaFx1MWVkMSBcdTAxMTBcdTAwZjQsIE1cdTFlZjkgXHUwMTEwXHUxZWU5YywgSFx1MDBlMCBOXHUxZWQ5aSIsImlzX3N0YWZmIjoiMCIsIm1hbmFnZV91c2VyX25hbWUiOiJ4dWFuaHVuZyIsInRyYW5zZmVycmVkX2RhdGUiOm51bGwsImFnZW50IjpudWxsLCJvcGVyYXRpb25fdHlwZSI6InhlIHRcdTFlYTNpIiwicGljdHVyZSI6IiJ9LCJjcmVhdGVkX2RhdGUiOiIyMDIzLTA3LTA0VDE1OjUzOjM5KzA3MDAiLCJpYXQiOjE2ODg0NjA4MTksImV4cCI6MTY5MTA1MjgxOX0.PepLb50c0lpU0CiiXklc0uyO2Fi4GbCbSfvRIH4uRj3RLu1rAzzHYAOF2agcAEy4mACh55I4nvhm30PssoFAzQ',
    },
  };
  
  const result = await axios
    .post(
      `http://testv4.adagps.com/index.php/api/FuelExtendedChangeController/getVehiclesList`,
      null,
      headers
    )
    .then(
      (response) => {
        if (typeof response.data === 'string') {
          response.data = JSON.parse(response.data.trim());
        }
        console.log('response.data: ', response.data);
      },
      (error) => {
        console.log('error', error);
      }
    );
};