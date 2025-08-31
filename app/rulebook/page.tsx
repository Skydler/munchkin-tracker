"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, FileText } from "lucide-react";
import toast from "react-hot-toast";
import { formatTimeAgo } from "@/utils/date";

// Type definition for custom rules
type CustomRule = {
  id: string;
  cardName: string;
  ruleDescription: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function Rulebook() {
  const [rules, setRules] = useState<CustomRule[]>([]);
  const [editingRule, setEditingRule] = useState<CustomRule | null>(null);
  const [formData, setFormData] = useState({
    cardName: "",
    ruleDescription: "",
  });

  // Mock data for demonstration - replace with Firebase integration
  useEffect(() => {
    // Simulate loading rules from Firebase
    const mockRules: CustomRule[] = [
      {
        id: "1",
        cardName: "Curse of the Chicken",
        ruleDescription:
          "When played, target player must speak in chicken sounds for 3 turns instead of 1",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: "2",
        cardName: "Chainsaw of Bloody Dismemberment",
        ruleDescription:
          "+3 Bonus becomes +5 if player makes chainsaw sound effects during combat",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
      {
        id: "3",
        cardName: "Ancient Dragon",
        ruleDescription:
          "Combat value reduced from 16 to 14 but treasure reward increased by 1 level",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
    ];
    setRules(mockRules);
  }, []);

  const handleOpenModal = (rule?: CustomRule) => {
    if (rule) {
      setEditingRule(rule);
      setFormData({
        cardName: rule.cardName,
        ruleDescription: rule.ruleDescription,
      });
    } else {
      setEditingRule(null);
      setFormData({
        cardName: "",
        ruleDescription: "",
      });
    }
    // Open DaisyUI modal
    (document.getElementById("rule_modal") as HTMLDialogElement)?.showModal();
  };

  const handleCloseModal = () => {
    setEditingRule(null);
    setFormData({
      cardName: "",
      ruleDescription: "",
    });
    // Close DaisyUI modal
    (document.getElementById("rule_modal") as HTMLDialogElement)?.close();
  };

  const handleSaveRule = () => {
    if (!formData.cardName.trim() || !formData.ruleDescription.trim()) {
      toast.error("Please fill in both card name and rule description");
      return;
    }

    const now = new Date();

    if (editingRule) {
      // Update existing rule
      setRules((prev) =>
        prev.map((rule) =>
          rule.id === editingRule.id
            ? {
                ...rule,
                cardName: formData.cardName.trim(),
                ruleDescription: formData.ruleDescription.trim(),
                updatedAt: now,
              }
            : rule,
        ),
      );
      toast.success("Rule updated successfully!");
    } else {
      // Add new rule
      const newRule: CustomRule = {
        id: Date.now().toString(), // In real app, Firebase would generate this
        cardName: formData.cardName.trim(),
        ruleDescription: formData.ruleDescription.trim(),
        createdAt: now,
        updatedAt: now,
      };
      setRules((prev) => [newRule, ...prev]);
      toast.success("Rule added successfully!");
    }

    handleCloseModal();
  };

  const handleDeleteRule = (ruleId: string, cardName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the custom rule for "${cardName}"?`,
    );
    if (confirmed) {
      setRules((prev) => prev.filter((rule) => rule.id !== ruleId));
      toast.success("Rule deleted successfully!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center m-5 sm:m-15">
      <main className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Custom Rules</h1>
          <button
            onClick={() => handleOpenModal()}
            className="btn btn-primary btn-lg"
          >
            <Plus className="h-5 w-5" />
            Add Rule
          </button>
        </div>

        {/* Rules List */}
        <div className="space-y-4">
          {rules.length === 0 ? (
            // Empty state
            <div className="card bg-base-200 shadow-sm">
              <div className="card-body text-center py-16">
                <FileText className="h-16 w-16 mx-auto mb-4 opacity-40" />
                <h3 className="text-xl font-semibold mb-2">
                  No custom rules yet
                </h3>
                <p className="mb-6 opacity-60">
                  Click "Add Rule" to create your first custom rule
                </p>
                <button
                  onClick={() => handleOpenModal()}
                  className="btn btn-primary"
                >
                  <Plus className="h-4 w-4" />
                  Add Your First Rule
                </button>
              </div>
            </div>
          ) : (
            rules.map((rule) => (
              <div key={rule.id} className="card bg-base-200 shadow-md">
                <div className="card-body p-4 md:p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="card-title text-lg md:text-xl mb-3">
                        {rule.cardName}
                      </h2>
                      <p className="text-base leading-relaxed mb-3">
                        {rule.ruleDescription}
                      </p>
                      <p className="text-sm opacity-60">
                        Modified {formatTimeAgo(rule.updatedAt)}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenModal(rule)}
                        className="btn btn-ghost btn-sm btn-square"
                        title="Edit rule"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteRule(rule.id, rule.cardName)}
                        className="btn btn-ghost btn-sm btn-square hover:btn-error"
                        title="Delete rule"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* DaisyUI Modal */}
        <dialog id="rule_modal" className="modal">
          <div className="modal-box w-11/12 max-w-2xl">
            <h3 className="font-bold text-lg mb-4">
              {editingRule ? "Edit Custom Rule" : "Add New Custom Rule"}
            </h3>

            <div className="space-y-4">
              <div className="fieldset">
                <legend className="fieldset-legend">Card Name</legend>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter the card name"
                  value={formData.cardName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      cardName: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="fieldset">
                <label className="fieldset-legend">
                  Custom Rule Description
                </label>
                <textarea
                  className="textarea h-48 resize-none w-full"
                  placeholder="Describe your custom rule modification"
                  value={formData.ruleDescription}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      ruleDescription: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="modal-action">
              <button onClick={handleCloseModal} className="btn">
                Cancel
              </button>
              <button onClick={handleSaveRule} className="btn btn-primary">
                {editingRule ? "Update Rule" : "Add Rule"}
              </button>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button onClick={handleCloseModal}>close</button>
          </form>
        </dialog>
      </main>
    </div>
  );
}
