### Intern challenge

#### Backend

1. Replace api key in HolidayCalendar.cs, line 14 with your own salling group api key.
2. Run unit tests.

#### Frontend

project is placed under src/holiday-calendar-fe

1. navigate to `src/holiday-calendar-fe` and run `npm install`.
2. Replace api key in proxyServer.ts, line 20 with your own salling group api key.
3. navigate to `src/axois-proxy` and run `npm install`.
4. in the same directory run `npx ts-node src/proxyServer.ts`
5. in a separate terminal, navigate to `src/holiday-calendar-fe` and run `npm start`
6. navigate to `http://localhost:3000/` 

I was forced to use a proxy server to bypass CORS restrictions, set by the salling group api.

The frontend is obviously a big mess, as it is my first time using react, and I had to learn it on the fly. I am aware that the code is not optimal, but I did my best to make it work.

The danish constitution day is not marked as a national holiday by the salling group holiday api, so it will not be shown together with the other holidays described my the second user story for the frontend. One could either also include non national holidays in the calendar, or hard code the fifth of june to always be marked as the constitution day.
