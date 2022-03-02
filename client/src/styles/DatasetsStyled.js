import {styled} from "@mui/system";
import {Card, CardMedia, Grid, Paper, TableContainer} from "@mui/material";

export const DatasetGrid = styled(Grid)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingRight: theme.spacing(8),
  paddingLeft: theme.spacing(8),
}));

export const ExampleCard = styled(Card)`
  max-width: 300px;
`;

export const ExampleCardImage = styled(CardMedia)`
  height: 150px;
`;

export const RootDiv = styled("div")`
  display: flex;
`;

export const Main = styled("main")`
  flex-grow: 1;
`;

export const WCTablePaper = styled(Paper)`
  width: 100%;
`;

export const WCTableContainer = styled(TableContainer)`
  max-height: 1000px;
`;
