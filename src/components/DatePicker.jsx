const DatePicker = ({setpickerDate,setFilter,style}) => {
    return <>
        <input style={{ padding: "6px", borderRadius: "2px", border: "1px solid lightgray",...style }} type="date" onChange={(e) => {
            setpickerDate(new Date(e.target.value).toISOString().split('T')[0])
            setFilter('picker')
        }} />
    </>
}
export default DatePicker