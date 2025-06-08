import { useState } from "react"

export default function ViewProductPage() {
  const [productq,setProductQ]=useState<number>(0);
  const [addToP,setAddToP]=useState<boolean>(false);
  function handleclickAddTocad(){
    addToP?setAddToP(false):setAddToP(true);
  }
  function decreament(){
     setProductQ(v=>v>0?v-1:v=0);
  }
  function increament(){
    setProductQ(v=>v+1);

  }
  return (
    <div className="product-overview">
            <div className="product-img">
                <img src="/img2/p4.jpeg" alt="this is an image" />
            </div>
            <div className="over-view">
                <p>Dell super</p>
                <h1>Dell Super</h1>
                <div>
                     <i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i>
                </div>
                <span>0 review</span>
                <span className="price">89</span>
                <div className="">
                    <h5>Description</h5>
                    <p>some description</p>
                </div>
            </div>
            
            <div className="set-price">
             
               
                 <p>
                <span>price</span>    
                <span>89</span>
              </p>
              <p>
              <span>price</span>    
              <span>89</span>
              </p>
              {addToP ?  <div> <button onClick={increament}>+</button> <p>{productq}</p><button onClick={decreament}>-</button>  </div>:<button className="addToC" onClick={handleclickAddTocad}>add to car</button>}
              
            </div>
    </div>
  )
}
