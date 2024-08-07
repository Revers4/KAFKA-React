import "./Select.css";
import Select from "react-dropdown-select";
import { useParams } from "react-router-dom";
import { addToWAPI } from "../../api/favorites";

export default function Select2({ status }) {
  const params = useParams();
  const data = [
    {
      status: "watching",
      english: "Watching",
      russian: "Смотрю",
    },
    {
      status: "will_watch",
      english: "Will watch",
      russian: "Буду смотреть",
    },
    {
      status: "watched",
      english: "Have watched",
      russian: "Просмотренно",
    },
    {
      status: "dropped",
      english: "Dropped",
      russian: "Забросил",
    },
    {
      status: "trash",
      english: "Trash",
      russian: "Мусор",
    },
    {
      status: "remove",
      english: "Remove from bookmarks",
      russian: "Убрать из закладок",
    }
  ];

  return (
    <div className="selectDiv">
      <Select
        style={{
          width: 230,
          backgroundColor: "#fefaf8",
          borderRadius: 6,
          boxShadow: "4px 4px 36px 5px rgba(195, 0, 255, 0.2)",
        }}
        color="rgba(195, 0, 255, 0.3)"
        dropdownHeight="200px"
        name="select"
        options={data}
        labelField="russian"
        valueField="status"
        values={
          data.find((option) => option.status == status)
            ? [data.find((option) => option.status == status)]
            : []
        }
        closeOnClickInput
        onChange={(e) => {
          async function add() {
            const status = e[0].status;
            await addToWAPI(params.Id, status);
          }
          add();
        }}
      ></Select>
    </div>
  );
}
