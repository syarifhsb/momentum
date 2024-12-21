export function NewTaskContainer() {
  return (
    <div className="grid gap-4">
      <form className="space-y-2">
        <label htmlFor="title" className="text-sm text-accent-foreground">
          New Task
        </label>
        <input
          type="text"
          id="title"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Title"
        />
      </form>
      <div className="space-y-2">
        <h4 className="font-medium leading-none">New Task</h4>
        <p className="text-sm text-muted-foreground">
          This is an example of a popup using the Popover component.
        </p>
      </div>
    </div>
  );
}
