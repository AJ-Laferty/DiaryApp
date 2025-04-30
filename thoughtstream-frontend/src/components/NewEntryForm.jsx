export default function NewEntryForm() {
    return (
      <form className="bg-white rounded shadow p-4 space-y-4">
        <h2 className="font-semibold text-lg">New Entry</h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full border px-3 py-2 rounded"
          disabled
        />
        <textarea
          placeholder="What's on your mind?"
          className="w-full border px-3 py-2 rounded"
          disabled
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded py-2"
          disabled
        >
          Save Entry
        </button>
      </form>
    );
  }
  