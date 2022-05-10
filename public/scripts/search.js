const handleSave = async (id) => {
  console.log("trewtrsdetgdfsg")
    await fetch('/api/saved', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: id})
    })
  };