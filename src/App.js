import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ReactDOM from "react-dom";
import Test from "react";

const App = () => {
  const [getData, setData] = useState({});

  const getAPIData = () => {
    const nameData = axios.get(
      "http://5c37c33f7820ff0014d927c5.mockapi.io/msr/names"
    );
    const ageData = axios.get(
      "http://5c37c33f7820ff0014d927c5.mockapi.io/msr/ages"
    );
    axios.all([nameData, ageData]).then(
      axios.spread((...data) => {
        const firstSet = data[0].data;
        const secondSet = data[1].data;

        const merge = firstSet.map((obj1) => ({
          ...obj1,
          ...secondSet.find((obj2) => obj2.id === obj1.id),
        }));
        console.log(merge);

        setData(merge);
      })
    );
  };

  useEffect(() => {
    getAPIData();
  }, []);
  return (
    <div className="App">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">id</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(getData).map(function (key, index) {
              const element = getData[index];
              return (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="right">
                    {" "}
                    {element.id}
                  </TableCell>
                  <TableCell align="right"> {element.firstName}</TableCell>
                  <TableCell align="right">{element.lastName}</TableCell>
                  <TableCell align="right">
                    {element.age ?? "undefined"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;
