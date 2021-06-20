import React from 'react'

const SelectCategory = ({data, onChange}) => {
   let options = ''
   if(typeof data === 'object')
   {
    options = data.map((item, i) => {
        return <option key={item.id} value={item.id}>{item.name}</option>
    })
   }
   return <div>
      <select onChange={onChange}>
          <option>Choose</option>
          {options}
      </select>
    </div>
}

export default SelectCategory