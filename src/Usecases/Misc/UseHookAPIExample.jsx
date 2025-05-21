import { useAPI } from "../../Hooks/useAPI";

export const UseHookAPIExample = () => {
  const { data, loading, error } = useAPI({
    endpoint: "/api/users",
    method: "GET",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {data?.users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
