import {styled} from "@mui/system";
import {Fab, Typography} from "@mui/material";

export const RootDiv = styled("div")`
  display: flex;
`;

export const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  paddingTop: theme.spacing(2),
  paddingRight: theme.spacing(4),
  paddingBottom: theme.spacing(0),
  paddingLeft: theme.spacing(4),
}));

export const TopButton = styled(Fab)`
  padding: 8px 4px;
  align-items: center;
  margin: 15px;
  width: 120px;
`;

export const JobTableToolBarTitle = styled(Typography)`
  flex: 1 1 100%;
`;