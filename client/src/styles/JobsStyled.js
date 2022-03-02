import {styled} from "@mui/system";
import {Fab} from "@mui/material";

export const RootDiv = styled("div")`
  display: flex;
`;

export const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: [2, 4, 0, 4].map(theme.spacing),
}));

export const TopButton = styled(Fab)`
  padding: 8px 4px;
  align-items: center;
  margin: 15px;
  width: 120px;
`;