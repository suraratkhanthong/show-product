 import './ContentApp.css';   
  
function ContentApp(props){
  const {dataContent, urlApi} = props;
   
  return(
    <div className="img-item">
      <img src={ urlApi+"/" +dataContent.url} 
      
      alt="for sell" />
      <p>{dataContent.name}  <span>${dataContent.price}</span></p>
     
    </div>
    );
}
export default ContentApp;