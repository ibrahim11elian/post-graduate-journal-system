import axios from "axios";
import Button from "react-bootstrap/Button";

const baseApiUrl = process.env.REACT_APP_API_URL;

function JudgeTable({ judgeList, setJudgeList }) {
  const handleDelete = async (id) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm("حذف البحث ؟");
    // Check if the user confirmed the action
    if (isConfirmed) {
      try {
        const res = await axios.delete(`${baseApiUrl}/judge-info/${id}`);
        if (res.status === 200) {
          const newJudgeList = judgeList.data.filter((item) => item.id !== id);
          setJudgeList({ data: [...newJudgeList] });
          alert("تم الحذف بنجاح", "success");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      // The user canceled the action
      alert("تم الالغاء", "success");
    }
  };

  return (
    <div className="table-responsive mt-5">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">التخصص</th>
            <th scope="col">الدرجة العلمية</th>
            <th scope="col">الاسم</th>
            <th scope="col">المسمى الوظيفي</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {judgeList.data
            ? judgeList.data.map((ele, i) => {
                return (
                  <tr key={i}>
                    <td>{ele.spec}</td>
                    <td>{ele.degree}</td>
                    <td>{ele.j_name}</td>
                    <td>{ele.job_title}</td>
                    <td>
                      <Button
                        style={{ width: "fit-content" }}
                        variant="danger"
                        onClick={() => handleDelete(ele.id)}
                      >
                        حذف
                      </Button>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default JudgeTable;
