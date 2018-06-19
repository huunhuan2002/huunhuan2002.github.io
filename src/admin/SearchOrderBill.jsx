import React from "react";
class SearchOrderBill extends React.Component{
    render()
    {
        return(
            <form  className="navbar-form pull-right" id="searchBox">
                <div className="input-group">
                    <input type="date" className="form-control" name="date"></input>
                </div>
                <button type="submit" className="btn"><span className="glyphicon glyphicon-search"></span></button>
            </form>
        )
    }
}
export default SearchOrderBill;