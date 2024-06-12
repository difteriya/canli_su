import DatePicker from "react-datepicker";
import { addDays, subDays, getDay, getYear, getMonth } from "date-fns";
import { ChevronLeft, ChevronRight } from "react-feather";
import "react-datepicker/dist/react-datepicker.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const DatePickerField = ({ name, value, onChange }) => {
  const isWeekday = (date) => {
    const day = getDay(date);
    // return day !== 0 && day !== 6;
    return day !== 0;
  };

  return (
    <DatePicker
      selected={(value && new Date(value)) || null}
      onChange={(val) => {
        onChange(name, val);
      }}
      className="f-input"
      minDate={addDays(new Date(), 1)}
      // placeholderText="Select a date"
      popperClassName="my-picker"
      // dateFormat="dd.MM.yyyy"
      showPopperArrow={false}
      showDisabledMonthNavigation
      disabledKeyboardNavigation
      filterDate={isWeekday}
      // includeDateIntervals={[
      //   {
      //     start: subDays(new Date(), 14),
      //     // end: addDays(new Date(), 14)
      //   }
      // ]}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled
      }) => (
        <div className="flex p-1 pb-0 justify-between items-center">
          <button
            className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:bg-transparent"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="font-medium text-sm ">
            {months[getMonth(date)]}, {getYear(date)}
          </div>

          <button
            className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:bg-transparent"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    />
  );
};

export default DatePickerField;
