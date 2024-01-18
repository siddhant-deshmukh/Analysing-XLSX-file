import xlsx from 'xlsx'


const workbook = xlsx.readFile('./Assignment_Timecard.xlsx')
const workbook_sheets = workbook.SheetNames
const the_sheet = workbook.Sheets[workbook_sheets[0]]
// console.log(the_sheet, workbook_sheets)
const data = xlsx.utils.sheet_to_json(the_sheet)

console.log("num of rows :", data.length)
// console.log(data)

//* ------------------------------------          Collecting data of employees         -----------------------------
const employee_data = new Map()
data.forEach((row, i) => {
  const positionID = row['Position ID']
  if (!employee_data.has(positionID)) {
    employee_data.set(positionID, {
      'Employee Name': row['Employee Name'],
      'File Number': row['File Number'],
      'Pay Cycle Start Date': row['Pay Cycle Start Date'],
      'Pay Cycle End Date': row['Pay Cycle End Date'],
      'shifts': [
        {
          'Time': row['Time'],
          'Time Out': row['Time Out'],
          'Timecard Hours (as Time)': row['Timecard Hours (as Time)'],
        }
      ],
    })
  } else {
    const old_data = employee_data.get(positionID)
    employee_data.set(positionID, {
      ...old_data,
      'shifts': old_data['shifts'].concat([{
        'Time': row['Time'],
        'Time Out': row['Time Out'],
        'Timecard Hours (as Time)': row['Timecard Hours (as Time)'],
      }]).slice(),
      'Pay Cycle Start Date': (row['Pay Cycle Start Date'] < old_data['Pay Cycle Start Date']) ? row['Pay Cycle Start Date'] : old_data['Pay Cycle Start Date'],
      'Pay Cycle End Date': (row['Pay Cycle End Date'] > old_data['Pay Cycle End Date']) ? row['Pay Cycle End Date'] : old_data['Pay Cycle End Date'],
    })
  }
})

let i = 0
employee_data.forEach((value, key) => {
  // console.log(key, value['shifts'])
  if(i == 10){
    IsShifDifferenceInRange(value['shifts'], 1 * 60 * 1000, 10 * 60 * 1000)
  }
  i += 1
})

function IsShifDifferenceInRange(shifts, min, max) {
  shifts.sort((s1, s2)=> s1['Time'] - s2['Time'])
  console.log(shifts)

  let num_consecutive_days = 0
}
//* ---------------           Checking if Employee Name, File Number, Position ID are unique to each entry  ------------------------
// const positionIDs = new Map()
// const comboIDs = new Map()

// data.forEach((row, i)=>{
//   let comboID = row['Position ID'] + row['Employee Name'] + row['File Number'] + row['File Number']
//   if(!comboIDs.has(comboID)){
//     comboIDs.set(comboID, 1)
//   }

//   let positionId = row['Position ID'] // + row['Employee Name'] + row['File Number']
//   if(positionIDs.has(positionId)){
//     const employee = positionIDs.get(positionId)
//     if(employee['Employee Name'] != row['Employee Name']){
//       console.log(positionId, i, "Not equal Emplyee Number", employee['Employee Name'], row['Employee Name'])
//     }
//     if(employee['File Number'] != row['File Number']){
//       console.log(positionId, i, "Not equal File Number", employee['File Number'], row['File Number'])
//     }
//   } else {
//     positionIDs.set(positionId, {
//       'Employee Name': row['Employee Name'],
//       'File Number': row['File Number']
//     })
//   }

// })
// if (comboIDs.size === positionIDs.size){
//   console.log("All Position ID, Employee Name, File Number are uniuqe")
// } else {
//   console.log( comboIDs.size , positionIDs.size ,"All Position ID, Employee Name, File Number are not uniuqe")
// }

