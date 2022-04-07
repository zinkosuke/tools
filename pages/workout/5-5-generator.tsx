import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Head from 'next/head';
import React from 'react';
import { InputText } from '~/components/InputText';
import { DefaultLayout } from '~/components/templates/DefaultLayout';

type Props = {};

type State = {
  rm: number;
};

type OnChangeFunction = (event: React.ChangeEvent<HTMLInputElement>) => void;

const xRound = (x: number, d: number = 1): number => {
  const dd = 10 ** d;
  return Math.round(x * dd) / dd;
};

const onPositiveNumberChange = (f: (x: number) => void): OnChangeFunction => {
  return (event: React.ChangeEvent<HTMLInputElement>): void => {
    const n: number = +event.target.value;
    if (0 <= n) f(n);
  };
};

const initState = (): State => ({
  rm: 0,
});

const title = '5x5 generator';

const Page = (props: Props): JSX.Element => {
  const [state, setState] = React.useState<State>(initState());

  const setNewRm = (x: number): void => setState({ rm: x });

  const onRmChange = onPositiveNumberChange(setNewRm);

  const repScheme = (x: number): string =>
    state.rm === 0 ? `${xRound(x * 100)}%` : `${xRound(state.rm * x)}kg`;

  const tHead = ['Day', 'Set-1', 'Set-2', 'Set-3', 'Set-4', 'Set-5'];
  const tRowsFirstSet = [
    0.55, 0.6, 0.55, 0.6, 0.65, 0.6, 0.65, 0.7, 0.65, 0.7, 0.75, 0.7, 0.75, 0.8,
    0.75, 0.8,
  ];

  return (
    <DefaultLayout title={title}>
      <Head>
        <title>{title}</title>
      </Head>
      <Container>
        <TextField
          label="1 Rep Max"
          margin="normal"
          onChange={onRmChange}
          placeholder="kg"
          sx={{ width: '7rem', marginRight: '1rem' }}
          type="number"
          value={state.rm}
        />
        <TableContainer component={Paper}>
          <Table sx={{ margin: 'auto', maxWidth: 760 }}>
            <TableHead>
              <TableRow>
                {tHead.map((x, i) => (
                  <TableCell sx={{ textAlign: 'center' }} key={i}>
                    {x}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tRowsFirstSet.map((x, i) => (
                <TableRow key={i}>
                  <TableCell sx={{ textAlign: 'center' }} key={-1}>
                    {i + 1}
                  </TableCell>
                  {[0, 1, 2, 3, 4].map((y, j) => (
                    <TableCell sx={{ textAlign: 'center' }} key={j}>
                      {repScheme(xRound(x + j * 0.05, 2))} x 5
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ padding: '1rem', textAlign: 'right' }}>
          <Button
            variant="contained"
            endIcon={<DoubleArrowIcon />}
            sx={{ width: '7rem', marginRight: '1rem' }}
            onClick={() => setNewRm(state.rm + 2.5)}
          >
            +2.5kg
          </Button>
          <Button
            variant="contained"
            endIcon={<DoubleArrowIcon />}
            sx={{ width: '7rem' }}
            onClick={() => setNewRm(state.rm + 5)}
          >
            +5kg
          </Button>
        </div>
      </Container>
    </DefaultLayout>
  );
};

export default Page;
