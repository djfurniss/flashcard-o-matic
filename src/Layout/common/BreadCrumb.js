import { Link } from "react-router-dom";
export default function BreadCrumb() {

    console.log(window.location.pathname)
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {/* {breadcrumb.map(path=>{
            return (
            <li className="breadcrumb-item">
                {path}
            </li>)
        })} */}

        {/* 
        <li className="breadcrumb-item active" aria-current="page">
          Library
        </li> */}
      </ol>
    </nav>
  );
}
