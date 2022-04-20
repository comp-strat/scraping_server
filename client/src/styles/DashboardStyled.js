import {styled} from "@mui/system";
import {Card, CardMedia, Grid, Paper} from "@mui/material";

export const TopButtonsGrid = styled(Grid)`
  margin: 20px 0 20px 0;
`;

export const StatCard = styled(Card)`
  max-width: 300px;
  max-height: 300px;
`;

export const StatCardContent = styled(CardMedia)`
  display: flex;
  justify-content: center;
`;

export const RightContainer = styled(Grid)(({ theme }) => ({
  padding: [2, 8, 0, 8].map(theme.spacing)
}));

export const ChartPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  overflow: "auto",
  flexDirection: "column",
  height: 360,
}));

export const Root = styled("div")`
  display: flex;
`;

export const Main = styled("main")`
  flex-grow: 1;
`;

export const largeButton = {
  padding: "15px"
};

export const largeIcon = {
  fontSize: "3em"
};
