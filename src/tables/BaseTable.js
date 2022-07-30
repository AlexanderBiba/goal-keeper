import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Box,
    Typography
} from "@mui/material";

export default function BaseTable({ title, rows, headers, emptyPlaceholder }) {
    return (
        <Box component={Paper} sx={{m: "1em", p: "1em"}}>
            <Typography variant="h5">{title}</Typography>
            {rows.length ? <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow >
                            {headers.map(({ label, attributes }, idx) => (
                                <TableCell key={idx} {...attributes}>{label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, i) => (
                            <TableRow key={i} >
                                {row.map(({ content, attributes }, j) => (
                                    <TableCell key={j} {...attributes}>{content}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> : <Box>
                <Typography variant="h6">{emptyPlaceholder}</Typography>
            </Box>}
        </Box>
    )
}