import React from 'react'

const Select = ({data, onChange}) => {
   let options = ''
   if(typeof data === 'object' && data[0].name)
   {
    options = data.map((item, i) => {
        return <option key={item.id} value={item.id}>{item.name}</option>
    })
   }
   else{
    options = ''
   }
    

    return <div>
      <select onChange={onChange}>
          <option>Choose</option>
          {options}
      </select>
    </div>
}

export default Select