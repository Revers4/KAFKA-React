import { useNavigate } from "react-router-dom";
import { genres } from "../../genres-list";
import "./Select.css";
import Select from "react-dropdown-select";
export default function Selectt() {
  const navigate = useNavigate();
  let genreIdsString = "";
  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
  };
  return (
    <div className="selectDivs">
      <Select
        style={{
          width: 250,
          backgroundColor: "#fefaf8",
          borderRadius: 6,
          boxShadow: "4px 4px 36px 5px rgba(195, 0, 255, 0.2)",
        }}
        closeOnClickInput
        color="rgba(195, 0, 255, 0.3)"
        separator
        clearable
        dropdownHeight="200px"
        name="select"
        id="genre"
        options={genres}
        labelField="russian"
        valueField="id"
        multi
        searchable
        searchBy="russian"
        onChange={(val) => {
          if (val.length == 0) {
            navigate("/");
            return;
          }
          val.forEach((g, index) => {
            if (index == 0) {
              genreIdsString = g.id;
              navigate("/?genre=" + genreIdsString);
            } else {
              genreIdsString = genreIdsString + "," + g.id;
              navigate("/?genre=" + genreIdsString);
            }
          });
        }}
      ></Select>
    </div>
  );
}
