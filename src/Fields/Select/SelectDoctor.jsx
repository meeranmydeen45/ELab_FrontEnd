import React from 'react'

const SelectDoctor = ({data, onChange}) => {
   let options = ''
   if(typeof data === 'object')
   {
    options = data.map((item, i) => {
        return <option key={item.id} value={item.id+'-'+item.gender}>{item.doctorName}</option>
    })
   }
   return <div>
      <select onChange={onChange}>
          <option>Choose</option>
          {options}
      </select>
    </div>
}

export default SelectDoctor