import { Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import deleteResearch from "../../services/delete-research";

const baseUrl = process.env.REACT_APP_BASE_URL;

// Function to extract the file name from a given path
function extractFileName(path) {
  const pathSegments = path.split("\\");
  return pathSegments[pathSegments.length - 1];
}

// ResearcherInfo Component: Displays detailed information about a researcher
function ResearcherInfo({ research, route, searchQuery }) {
  const navigate = useNavigate();

  // Function to navigate back to the previous page
  const goBack = () => {
    document.title = "مجلة كلية الدراسات العليا";
    if (searchQuery && route) {
      navigate("/search", {
        state: {
          searchQuery: JSON.stringify(searchQuery),
          route: JSON.stringify(route),
        },
      });
    } else {
      navigate("/");
    }
  };

  // Function to handle the deletion of a research item
  async function deleteItem() {
    let judgeIds;
    if (research.judgeExamination) {
      // eslint-disable-next-line array-callback-return
      judgeIds = research.judgeExamination.map((e) => {
        if (e.examination_details) {
          return e.examination_details.judge_id;
        }
      });
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger me-2",
      },
      buttonsStyling: false,
    });

    // Display a confirmation dialog
    swalWithBootstrapButtons
      .fire({
        title: "حذف البحث ؟",
        text: "سيتم حذف البحث نهائياً",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "نعم، احذف",
        cancelButtonText: "لا، الغاء",
        reverseButtons: true,
        showLoaderOnConfirm: true,
        preConfirm: async (login) => {
          try {
            await deleteResearch(research.researcher.id, judgeIds);
          } catch (error) {
            Swal.showValidationMessage(`Request failed: ${error}`);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      })
      .then(async (result) => {
        // Check if the user confirmed the action
        if (result.isConfirmed) {
          navigate("/");

          swalWithBootstrapButtons.fire({
            title: "تم حذف البحث بنجاح !",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "تم الغاء الحذف",
            icon: "error",
          });
        }
      });
  }

  return (
    <div className="d-flex flex-wrap bg-white p-1 pb-4 justify-content-between">
      {/* Researcher information section */}
      <div className="d-flex gap-3 align-items-center">
        <div
          className="rounded-circle d-flex justify-content-center align-items-center overflow-hidden shadow"
          style={{ width: "8rem", height: "8rem" }}
        >
          {research.researcher.photo ? (
            <img
              className="w-100 h-100 object-fit-cover"
              src={`${baseUrl}/photo/${extractFileName(
                research.researcher.photo
              )}`}
              alt={research.researcher.researcher_name}
              title={research.researcher.researcher_name}
            />
          ) : (
            <FaUserCircle size={100} color="#8d8d8d" />
          )}
        </div>
        <div className="">
          {/* Researcher details */}
          <h2 className="text-xl font-bold text-dark">
            {research.researcher.rank} / {research.researcher.researcher_name}{" "}
          </h2>
          <h4 className="text-sm text-muted mb-1">
            {research.researcher.workplace}
          </h4>
          <p className="text-sm text-muted mb-1">
            الهاتف: {research.researcher.phone}
          </p>
          <p className="text-sm text-muted mb-0">
            البريد الالكتروني: {research.researcher.email}
          </p>
          {research.researcher.cv ? (
            <p>
              السيرة الذاتية:{" "}
              <a
                href={`${baseUrl}/cv/${extractFileName(
                  research.researcher.cv
                )}`}
              >
                اضغط هنا
              </a>
            </p>
          ) : null}
        </div>
      </div>
      {/* Action buttons section */}
      <div className="d-flex align-items-center gap-2 mt-2">
        <Button
          className="btn-details"
          onClick={() =>
            navigate(`/edit`, {
              state: {
                data: JSON.stringify(research),
              },
            })
          }
        >
          تعديل
        </Button>
        <Button variant="danger" onClick={() => deleteItem()}>
          حذف
        </Button>
        <Button variant="outline-secondary" onClick={() => goBack()}>
          {searchQuery && route ? (
            <>
              رجوع <FaArrowLeft />
            </>
          ) : (
            <>
              الرئيسية <FaHome />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default ResearcherInfo;
