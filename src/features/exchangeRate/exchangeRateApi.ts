import { DateTime } from "luxon";

export const fetchAllByDate = async (date: DateTime): Promise<{ [key:string]: any }> => {
    const operationName = 'AllValues'
    const response = await fetch('http://localhost:8080//v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operationName,
        query: `
          query AllValues($date: date) {
            exchange_rate(
              where: {day: {_eq: $date}}
            ) {
              origin
              rate
              target
            }
          }
        `,
        variables: {
          date: date.toISODate() 
        }
      }),
    });
    return await response.json();
  }