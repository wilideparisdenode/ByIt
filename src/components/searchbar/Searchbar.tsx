import "./searchbar.css";
export default function Searchbar() {
  return (
  
          <div className="nav-search">
              <select name="category" id="">
                <option value="All">All</option>
                <option value="Mouse">Mouse</option>
                <option value="monitors">monitors</option>
              </select>
              <input type="text" name="search" placeholder="search ..."/>
              <span className="search_icon"><i className="bi bi-search"></i></span>
              <section className="searchP"></section>
          </div>        
     
  
  )
}
