import { Table } from "../../Layout/Table/jsx/Table.jsx";

const userData = [
  {
    id: 1,
    name: "Danishan",
    email: "danishan@example.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Salman",
    email: "salman@example.com",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Sajid",
    email: "sajid@example.com",
    status: "Pending",
  },
  {
    id: 1,
    name: "Danishan",
    email: "danishan@example.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Salman",
    email: "salman@example.com",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Sajid",
    email: "sajid@example.com",
    status: "Pending",
  },
  {
    id: 1,
    name: "Danishan",
    email: "danishan@example.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Salman",
    email: "salman@example.com",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Sajid",
    email: "sajid@example.com",
    status: "Pending",
  },
];

export const UserTableExample = () => {
  return (
    <Table
      data={userData}
      columns={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "actions", label: "Actions" },
        {
          key: "status",
          label: "Status",
        },
      ]}
      columnWidths={{ name: 2, email: 3, status: 1 }}
      isAction={true}
      clickableColumns={["name", "email"]}
      onCellClick={(value, row) => console.log("Clicked", value)}
      styling={{
        colorLinkText: "var(--colorBlue)",
        colorHeaderText: "var(--colorCyan)",
        colorBodyText: "var(--colorGray5)",
        colorHeaderCellBg: "var(--colorGray2)",
        colorBodyCellBg: "var(--colorGray2)",
        colorTableBg: "var(--colorWhite)",
      }}
    />
  );
};
