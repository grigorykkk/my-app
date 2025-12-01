// forms/TechnologyForm.jsx
import { useCallback, useMemo, useState } from 'react';

const initialForm = {
  title: '',
  description: '',
  category: '',
  difficulty: '',
  deadline: '',
};

function TechnologyForm({ initialData = {}, onSave, onCancel }) {
  const [values, setValues] = useState({ ...initialForm, ...initialData });

  const validate = useCallback((data) => {
    const newErrors = {};
    if (!data.title.trim()) newErrors.title = 'Введите название технологии';
    if (!data.description.trim())
      newErrors.description = 'Введите описание';
    if (!data.category.trim()) newErrors.category = 'Выберите категорию';

    // простая проверка дедлайна
    if (data.deadline && Number.isNaN(Date.parse(data.deadline))) {
      newErrors.deadline = 'Некорректная дата';
    }

    return newErrors;
  }, []);

  const errors = useMemo(() => validate(values), [validate, values]);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onSave(values);
  };

  return (
    <form onSubmit={handleSubmit} className="technology-form" aria-label="Форма технологии">
      <h2>{initialData?.id ? 'Редактирование технологии' : 'Новая технология'}</h2>

      <div className="form-group">
        <label htmlFor="title">Название *</label>
        <input
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          aria-invalid={!!errors.title}
          aria-describedby="title-error"
        />
        {errors.title && (
          <span id="title-error" className="error-message">
            {errors.title}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description">Описание *</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={values.description}
          onChange={handleChange}
          aria-invalid={!!errors.description}
          aria-describedby="description-error"
        />
        {errors.description && (
          <span id="description-error" className="error-message">
            {errors.description}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="category">Категория *</label>
        <select
          id="category"
          name="category"
          value={values.category}
          onChange={handleChange}
          aria-invalid={!!errors.category}
          aria-describedby="category-error"
        >
          <option value="">Выберите…</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="language">Языки</option>
          <option value="devops">DevOps</option>
        </select>
        {errors.category && (
          <span id="category-error" className="error-message">
            {errors.category}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="difficulty">Сложность</label>
        <select
          id="difficulty"
          name="difficulty"
          value={values.difficulty}
          onChange={handleChange}
        >
          <option value="">Не указано</option>
          <option value="beginner">Начальный</option>
          <option value="intermediate">Средний</option>
          <option value="advanced">Продвинутый</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="deadline">Дедлайн (для сам. работы 25)</label>
        <input
          id="deadline"
          type="date"
          name="deadline"
          value={values.deadline}
          onChange={handleChange}
          aria-invalid={!!errors.deadline}
          aria-describedby="deadline-error"
        />
        {errors.deadline && (
          <span id="deadline-error" className="error-message">
            {errors.deadline}
          </span>
        )}
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel}>
          Отмена
        </button>
        <button type="submit" disabled={!isValid}>
          Сохранить
        </button>
      </div>
    </form>
  );
}

export default TechnologyForm;
