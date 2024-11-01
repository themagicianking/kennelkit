const serverName = import.meta.env.VITE_API_URL;

export const PUT = {
  editOwner: async (editedOwner) => {

    await fetch(`https://${serverName}/owner`, {
      method: "PUT",
      body: JSON.stringify(editedOwner),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status >= 400) {
          throw res.status;
        }
        return res.json();
      })
      .then((json) => console.log("Server response:", json));
  },
};
