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
  tm: number;
};

type OnChangeFunction = (event: React.ChangeEvent<HTMLInputElement>) => void;

const xRound = (x: number): number => Math.round(x * 10) / 10;

const onPositiveNumberChange = (f: (x: number) => void): OnChangeFunction => {
  return (event: React.ChangeEvent<HTMLInputElement>): void => {
    const n: number = +event.target.value;
    if (0 <= n) f(n);
  };
};

const initState = (): State => ({
  rm: 0,
  tm: 0,
});

const title = '5/3/1 generator';

const Page = (props: Props): JSX.Element => {
  const [state, setState] = React.useState<State>(initState());

  const setNewRm = (x: number): void =>
    setState({ rm: x, tm: xRound(x * 0.9) });
  const setNewTm = (x: number): void =>
    setState({ rm: xRound(x / 0.9), tm: x });

  const onRmChange = onPositiveNumberChange(setNewRm);
  const onTmChange = onPositiveNumberChange(setNewTm);

  const repScheme = (x: number): string =>
    state.tm === 0 ? `${x * 100}%` : `${xRound(state.tm * x)}kg`;

  const tHead = ['Week', 'Set-1', 'Set-2', 'Set-3'];
  const tRows = [
    [
      '1',
      `${repScheme(0.65)} x 5`,
      `${repScheme(0.75)} x 5`,
      `${repScheme(0.85)} x 5+`,
    ],
    [
      '2',
      `${repScheme(0.7)} x 3`,
      `${repScheme(0.8)} x 3`,
      `${repScheme(0.9)} x 3+`,
    ],
    [
      '3',
      `${repScheme(0.75)} x 5`,
      `${repScheme(0.85)} x 3`,
      `${repScheme(0.95)} x 1+`,
    ],
    [
      '4',
      `${repScheme(0.4)} x 5`,
      `${repScheme(0.5)} x 5`,
      `${repScheme(0.6)} x 5+`,
    ],
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
        <TextField
          label="Training Max"
          margin="normal"
          onChange={onTmChange}
          placeholder="kg"
          sx={{ width: '7rem', marginRight: '1rem' }}
          type="number"
          value={state.tm}
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
              {tRows.map((tRow, i) => (
                <TableRow key={i}>
                  {tRow.map((x, j) => (
                    <TableCell sx={{ textAlign: 'center' }} key={j}>
                      {x}
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
