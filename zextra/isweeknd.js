import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
        // const date = dayjs();
        // const fiveDays = today.subtract(1, 'month');
        // const afterFiveDays = fiveDays.format('dddd, MMMM, D')
        // console.log(afterFiveDays);

        // console.log(date.format('dddd'));


       export function isWeekend(date){
                const dayOfWeek = date.format('dddd')
                return dayOfWeek === 'Sunday' || dayOfWeek === 'Saturday';
        }

        let date = dayjs();
        console.log(date.format('dddd'))
        console.log(isWeekend(date));

        date = dayjs().add(2,'day');
        console.log(date.format('dddd'))
        console.log(isWeekend(date));

        date = dayjs().add(4,'day');
        console.log(date.format('dddd'))
        console.log(isWeekend(date));

        date = dayjs().add(3,'day');
        console.log(date.format('dddd'))
        console.log(isWeekend(date));

        date = dayjs().add(6,'day');
        console.log(date.format('dddd'))
        console.log(isWeekend(date));