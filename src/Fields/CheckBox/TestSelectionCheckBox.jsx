const TestSelectionCheckBox = ({data, onChange, onHandleIconClick}) => {
    let checkBoxItems
    const list = data.map((item, i) => {
    
      if(item.testTypes.length > 0)
      {
        checkBoxItems = item.testTypes.map((item, i) => {
            return(
              <div key={i} style={{margin:'10px'}}>
             
              <input type="checkbox" value={item.testName} id={item.id} onChange={onChange} cost ={item.testCost}/>
              <label style={{marginLeft:'15px'}}>{item.testName}</label>
            </div>
    
            );
          });
      }
      else{
        checkBoxItems = ''
      }   
      
      return (
        <div key={i} className="checkBoxHeader">
          <h4>
            <i className="fa fa-plus" 
            onClick={onHandleIconClick}></i>{item.categoryName}</h4>
          <div className="checkBoxItems">
          {checkBoxItems}
          </div>
        </div>
      );
    });
  
    return list;
  };
  
  export default TestSelectionCheckBox;
