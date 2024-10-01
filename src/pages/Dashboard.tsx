import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { todosCreate } from "../store/reducer/todoSlice";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TodosList from "../components/TodosList";
import { Container } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { loggedUserId } from "../common/utils";
interface ToDoFormData {
  title: string;
  description: string;
  status?: boolean;
  createdAt?: string;
}

const Dashboard = () => {
  const {
    register,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ToDoFormData>();
  const allTodos = useSelector((state: any) => state?.todo?.todoList);
  const dispach = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState<any>(false);

  /**
   * createTodo creates the todo's
   * @param params
   */
  const createTodo = (params: ToDoFormData | any) => {
    const [title, description] = params;
    const isExisted =
      allTodos.findIndex((todo: ToDoFormData) => todo.title === title) === -1;
    if (isExisted) {
      const palyload: any = [
        ...allTodos,
        {
          title,
          description,
          status: false,
          createdBy: loggedUserId,
          createdAt: new Date().toISOString(),
        },
      ];
      dispach(todosCreate(palyload));
    } else {
      setShowSnackBar("Title should be unique");
    }
    setValue("title", "");
    setValue("description", "");
  };

  /**
   * renderFormData renders the todo's form
   * @returns HTML elements
   */
  const renderFormData = () => {
    return (
      <>
        <Box padding={1}>
          <TextField
            label="Title"
            fullWidth
            {...register("title", {
              required: "Title name is required",
              minLength: {
                value: 5,
                message: "Title required minimum 5 characters.",
              },
            })}
            onInput={() => trigger(["description", "title"])}
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ""}
            sx={{ mb: "10px" }}
          />
          <TextField
            label="Description"
            fullWidth
            onInput={() => trigger(["description", "title"])}
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Title required minimum 10 characters.",
              },
            })}
            rows={5}
            multiline
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ""}
            sx={{ mb: "5px" }}
          />
        </Box>
      </>
    );
  };

  return (
    <>
      <Box>
        <Grid container>
          <Grid size={{ md: 2, sm: 0 }}></Grid>
          <Grid size={{ md: 8, sm: 12, xs: 12 }}>
            <Container>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: "10px",
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Todo's
                </Typography>
                <Fab
                  color="primary"
                  onClick={() => setShowModal(true)}
                  aria-label="add"
                  variant="extended"
                >
                  <AddIcon />
                  add
                </Fab>
              </Box>
              <Divider />
              <TodosList />
            </Container>
          </Grid>
          <Grid size={{ md: 2, sm: 0 }}></Grid>
        </Grid>
      </Box>
      {showModal && (
        <Modal
          title="Create Todo"
          body={renderFormData()}
          onModalClose={(data) => {
            // setShowModal(false)
            if (data) {
              trigger(["description", "title"]).then((result) => {
                if (result) {
                  setShowModal(false);
                  const formData = getValues(["title", "description"]);
                  createTodo(formData);
                }
              });
            } else {
              setShowModal(false);
            }
          }}
        />
      )}

      <Snackbar
        open={showSnackBar}
        autoHideDuration={4000}
        onClose={() => setShowSnackBar(true)}
        message={showSnackBar}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setShowSnackBar(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
};
export default Dashboard;
