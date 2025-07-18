import React, { useState } from "react";
import { AIModel } from "@/models/AIModel";

type Props = {
  aiModels: AIModel[];
  selected: AIModel[];
  onChange: (selected: AIModel[]) => void;
};

export default function MultiSelectAIModel({ aiModels, selected, onChange }: Props) {
  const [search, setSearch] = useState("");

  const filtered = aiModels.filter(
    (m) =>
      m.modelName.toLowerCase().includes(search.toLowerCase()) ||
      m.provider.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (model: AIModel) => {
    if (selected.some((s) => s.id === model.id)) {
      onChange(selected.filter((s) => s.id !== model.id));
    } else {
      onChange([...selected, model]);
    }
  };

  return (
    <div className="w-full">
      {/* Selected tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selected.map((model) => (
          <span key={model.id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center">
            {model.modelName}
            <button
              type="button"
              className="ml-1 text-xs"
              onClick={() => toggle(model)}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      {/* Search input */}
      <input
        className="w-full border px-2 py-1 rounded mb-2"
        placeholder="Tìm kiếm AI Model..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* Options */}
      <div className="max-h-40 overflow-y-auto border rounded">
        {filtered.map((model) => (
          <label key={model.id} className="flex items-center px-2 py-1 cursor-pointer hover:bg-gray-100">
            <input
              type="checkbox"
              checked={selected.some((s) => s.id === model.id)}
              onChange={() => toggle(model)}
              className="mr-2"
            />
            {model.modelName} <span className="ml-2 text-xs text-gray-500">({model.provider})</span>
          </label>
        ))}
        {filtered.length === 0 && (
          <div className="px-2 py-1 text-gray-400">Không tìm thấy AI Model</div>
        )}
      </div>
    </div>
  );
}
