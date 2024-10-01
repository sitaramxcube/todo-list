import { memo, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArticleIcon from "@mui/icons-material/Article";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { todosCreate } from "../store/reducer/todoSlice";
import Typography from "@mui/material/Typography";
import Modal from "./Modal";
import Fab from "@mui/material/Fab";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Divider from '@mui/material/Divider';
import PageviewIcon from '@mui/icons-material/Pageview';
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";


interface ToDoData {
  title: string;
  description: string;
  status?: boolean;
  createdAt?: string | any;
}

const TodosList = () => {
  const allTodos = useSelector((state: any) => state?.todo?.todoList);
  const dispach = useDispatch();

  const [checked, setChecked] = useState([1]);
  const [showWarning, setShowWarning] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<ToDoData>();

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  /**
   * deleteTodo delete the todo's
   * @param status
   */
  const deleteTodo = (status: boolean) => {
    if (status) {
      const remainingRecords = allTodos.filter(
        (todo: ToDoData) => todo.title !== selectedTodo?.title
      );

      dispach(todosCreate(remainingRecords));
    }
    setShowWarning(false);
  };

  const changeStatus = (item: ToDoData) => {
    if (!item.status) {
        const updatedItem: ToDoData = { ...item, status: true };
        const updatedTodos = allTodos.map((todo: ToDoData) =>
            todo.title === updatedItem.title ? updatedItem : todo
        );
      dispach(todosCreate(updatedTodos));
    }
  };
const getPreviewConten = () => {
  return (
    <Box flexDirection={'column'} alignItems={'center'}  display="flex" justifyContent="center">


        <Typography variant="h5" component="div" gutterBottom>
          {selectedTodo?.title}
        </Typography>

        <Typography variant="body1" color="textSecondary" paragraph>
          {selectedTodo?.description}
        </Typography>

        <Typography variant="body2" color="textSecondary">
          Status: {selectedTodo?.status ? <Chip label="Completed" color="primary" variant="outlined" /> : <Chip label="Incomplete" color="success" variant="outlined" />}
        </Typography>

        <Typography variant="body2" color="textSecondary">
          Created At: {new Date(selectedTodo?.createdAt).toLocaleDateString()}{" "}
          {new Date(selectedTodo?.createdAt).toLocaleTimeString()}
        </Typography>
 

  </Box>
  )
}
  return (
    <>
      <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
        {allTodos?.map((todo: any, index: number) => {
          const labelId = `checkbox-list-secondary-label-${todo?.createdAt}`;
          return (
            <>
            <ListItem
              key={index}
              secondaryAction={
                <>
                  <Box
                    display={"flex"}
                    width={"auto"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Fab
                      key={"keyFab" + index}
                      variant="extended"
                      color={todo.status ? "success" :  "warning" }
                      aria-label="Complete"
                    >
                      {!todo.status ? (
                        <CheckBoxOutlineBlankIcon
                          onClick={() => changeStatus(todo)}
                        />
                      ) : (
                        <CheckBoxIcon />
                      )}
                    </Fab>
                    &nbsp;
                    <Fab color="error" aria-label="Complete">
                      <DeleteOutlineIcon
                        onClick={() => {
                          setShowWarning(true);
                          setSelectedTodo(todo);
                        }}
                      />
                    </Fab>
                    &nbsp;
                    <Fab color="info" aria-label="Complete">
                      <PageviewIcon
                        onClick={() => {
                          setShowDetails(true);
                          setSelectedTodo(todo);
                        }}
                      />
                    </Fab>
                  </Box>
                </>
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={todo?.title?.toUpperCase()}
                    src={`/static/images/avatar/${todo?.title + 1}.jpg`}
                  />
                </ListItemAvatar>

                <ListItemText
                  id={labelId}
                  primary={
                    <>
                      <Typography variant="body1">
                        {todo?.title?.toUpperCase()}
                      </Typography>
                      <Typography variant="body2">
                        {new Date(todo?.createdAt).toLocaleDateString()}
                      </Typography>
                    </>
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider/>
            </>
          );
        })}
      </List>
      {!allTodos?.length && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ArticleIcon sx={{ fontSize: "100px" }} />
          No Todo's found!
        </Box>
      )}
      {showWarning && (
        <Modal
          title="Are you sure want to delete?"
          body={<></>}
          onModalClose={deleteTodo}
        />
      )}
      {showDetails && (
        <Modal
          title="Preview"
          body={getPreviewConten()}
          isHideCancelBtn={true}
          onModalClose={() => {
            setShowDetails(false)
            setSelectedTodo(undefined)
          }}
        />
      )}
    </>
  );
};

export default memo(TodosList);
