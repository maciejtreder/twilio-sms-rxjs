import { sendSMS } from './rxjs-twilio';
import { of, merge } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const phoneNumbers = [
   '+15017122661', // Use your registered mobile phone number here
   'non-existing',
   '+484110677' // Use a landline phone number here
];

const requests = [];

phoneNumbers.forEach(number => {
   requests.push(
       sendSMS(number, `Hello world!`).pipe(
           map(response => {
               return { number: number, status: response.status };
           }),
           catchError(error => of({number: number, status: 'error', details: error})),
           map(response => {
               response.time = new Date();
               return response;
           })
       )
   );
});

merge(...requests).pipe(
   tap(() => console.log(`\n-------------------------------\n`))
).subscribe(console.log);