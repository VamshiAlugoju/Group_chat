import React from "react";
// import "groupinfo.css"
// import Loader from "../../../components/Loader";
import "./adduserItem.css";

// import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

// const override: CSSProperties = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
// };

function AdduserItem(props) {
  let [loading, setLoading] = React.useState(false);
  const [added, setadded] = React.useState(false);
  function change_loading() {
    setLoading((p) => !p);
  }

  function Loader(props) {
    return (
      <div className="sweet-loading">
        <ClipLoader
          color={"#9b30b0"}
          loading={loading}
          //   cssOverride={override}
          size={10}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  function add_to_group() {

     setLoading(true);
    axios
      .post("http://localhost:3000/groups/add_to_group", {
        userId: props.id,
        groupId: props.groupId,
      })
      .then((res) => {
        setLoading(false)
        setadded(true)
        console.log("added");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="user_main add_user_name_modal">
      <div className="add_user_name">
        <p className="">{props.name}</p>
      </div>
      <div className="add_btn">
        <button onClick={add_to_group} className="add_user_btn">
          {!loading && !added ? (
            <i
              className="fa-solid fa-plus fa-beat-fade"
              style={{ color: "#180ae6" }}
            ></i>
          ) : (
            ""
          )}
          {!added && loading ? <Loader /> : ""}
          {added ? (
           <i className="fa-solid fa-check"  style={{ color: "#180ae6" }}></i>
          ) : (
            ""
          )}
          <Loader />
        </button>
      </div> 
           
    </div>
  );
}

export default AdduserItem;
