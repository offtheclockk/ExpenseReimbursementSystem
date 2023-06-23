import { styled } from "@mui/system";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
} from "@mui/material";

export const TableContainerStyled = styled(TableContainer)`
  margin-top: 16px;
`;

export const HeadingTypography = styled(Typography)`
  font-size: 24px;
  margin-bottom: 16px;
`;

export const ApproveButton = styled(Button)`
  background-color: #4caf50;
  color: white;
  &:hover {
    opacity: 0.8;
  }
`;

export const DenyButton = styled(Button)`
  background-color: #f44336;
  color: white;
  &:hover {
    opacity: 0.8;
  }
`;
