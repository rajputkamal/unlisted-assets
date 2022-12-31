export function getDateAndTime(today) {
  let date_time_array = today.split(" ");
  let newdate = date_time_array[0].split("-");
  let newdatetime =
    newdate[2] + "-" + newdate[1] + "-" + newdate[0] + " " + date_time_array[1];
  let d = new Date(newdatetime);
  let n = d.toLocaleString("en-GB", { year:"numeric", month:"short", day:"numeric", hour12: true });
  return n;
}

export function getTime(today) {
    let date_time_array = today.split(" ");
    let newdate = date_time_array[0].split("-");
    let newdatetime =
      newdate[2] + "-" + newdate[1] + "-" + newdate[0] + " " + date_time_array[1];
    let d = new Date(newdatetime);
    let n = d.toLocaleString("en-GB", { hour: 'numeric', minute: 'numeric', hour12: true });
    return n;
  }
  
