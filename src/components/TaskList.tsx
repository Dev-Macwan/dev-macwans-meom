import { useState, useEffect } from 'react';
import { getTodayEntry, saveTodayEntry, Task } from '@/lib/meomStorage';
import { Plus, X, Check } from 'lucide-react';

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [newTime, setNewTime] = useState('');

  useEffect(() => {
    const todayEntry = getTodayEntry();
    if (todayEntry?.tasks) {
      setTasks(todayEntry.tasks);
    }
  }, []);

  const saveTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    saveTodayEntry({ tasks: updatedTasks });
  };

  const addTask = () => {
    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      text: newTask.trim(),
      time: newTime || undefined,
      completed: false,
    };

    saveTasks([...tasks, task]);
    setNewTask('');
    setNewTime('');
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updatedTasks);
  };

  const removeTask = (id: string) => {
    saveTasks(tasks.filter(task => task.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="meom-section">
      <h2 className="meom-section-title">Tomorrow's Tasks</h2>

      <div className="space-y-3">
        {/* Add new task */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a task..."
            className="meom-input flex-1 py-2"
          />
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="meom-input w-28 py-2 text-center"
          />
          <button
            onClick={addTask}
            disabled={!newTask.trim()}
            className="bg-primary text-primary-foreground rounded-xl px-4 py-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Task list */}
        <div className="space-y-2 mt-4">
          {tasks.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-4">
              No tasks for tomorrow yet
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-3 rounded-xl bg-secondary/50 transition-all ${
                  task.completed ? 'opacity-60' : ''
                }`}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    task.completed
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'border-muted-foreground/40 hover:border-primary'
                  }`}
                >
                  {task.completed && <Check size={14} />}
                </button>
                <span
                  className={`flex-1 ${
                    task.completed ? 'line-through text-muted-foreground' : ''
                  }`}
                >
                  {task.text}
                </span>
                {task.time && (
                  <span className="text-sm text-muted-foreground">
                    {task.time}
                  </span>
                )}
                <button
                  onClick={() => removeTask(task.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
