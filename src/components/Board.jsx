import { DragDropContext } from '@hello-pangea/dnd'
import Column from './Column'

export default function Board({ board, search, moveTask, onAddTask, onEditTask, onDeleteTask }) {
  function getFilteredTasks(col) {
    return col.taskIds
      .map((id) => board.tasks[id])
      .filter(Boolean)
      .filter((t) =>
        !search || t.title.toLowerCase().includes(search.toLowerCase())
      )
  }

  return (
    <DragDropContext onDragEnd={moveTask}>
      <div className="flex gap-4 h-full overflow-x-auto overflow-y-hidden px-4 pb-4">
        {board.columnOrder.map((colId) => {
          const column = board.columns[colId]
          const tasks = getFilteredTasks(column)
          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              onAddTask={() => onAddTask(column.id)}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
            />
          )
        })}
      </div>
    </DragDropContext>
  )
}
