import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { User } from "../types/user.types";

function UserTable({ IsReadOnly, users,handleEditUser,handleDelete }:{
  IsReadOnly: boolean;
  users: User[];
  handleEditUser:
})  {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const handleCheckbox = (
    id: string,
    checked: boolean,
    multiSelect: boolean = false,
  ) => {
    if (multiSelect) {
      if (checked) {
        return setCheckedList(users.map((u) => u._id));
      }
      if (!checked) {
        return setCheckedList([]);
      }
    }

    if (!checked) {
      setCheckedList((prev) => prev.filter((item) => item !== id));
    } else {
      setCheckedList((prev) => [...prev, id]);
    }
  };
return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          {/* Table Header */}
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              {!IsReadOnly && (
                <th className="w-12 px-5 py-4">
                  <input
                    onChange={(e) => handleCheckbox("", e.target.checked, true)}
                    type="checkbox"
                    aria-label="Select all users"
                    className="h-4 w-4 rounded border-gray-300 accent-orange-500"
                  />
                </th>
              )}

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Name
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Email
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Teams
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>

              {!IsReadOnly && (
                <th className="w-24 px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                      <Plus size={22} className="text-orange-500" />
                    </div>

                    <p className="font-medium text-gray-900">No users found</p>

                    <p className="mt-1 text-sm text-gray-500">
                      Add your first user to get started.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              users
                .map((user) => (
                  <tr
                    key={user._id}
                    className="transition hover:bg-orange-50/30"
                  >
                    {/* Checkbox */}
                    {!IsReadOnly && (
                      <td className="px-5 py-4">
                        <input
                          onChange={(e) => {
                            console.log(user._id, e.target.checked);
                            handleCheckbox(user._id, e.target.checked);
                          }}
                          type="checkbox"
                          checked={checkedList.includes(user._id)}
                          aria-label={`Select ${user.name}`}
                          className="h-4 w-4 rounded border-gray-300 accent-orange-500"
                        />
                      </td>
                    )}

                    {/* Name */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-600">
                          {user.name?.charAt(0)?.toUpperCase()}
                        </div>

                        <div>
                          <p className="font-medium text-gray-900">
                            {user.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-5 py-4">
                      <span className="text-sm text-gray-600">
                        {user.email}
                      </span>
                    </td>

                    {/* Teams */}
                    <td className="px-5 py-4">
                      <div className="flex max-w-xs flex-wrap gap-1.5">
                        {user.teamlist?.length ? (
                          user.teamlist.map((team: any, index: number) => (
                            <span
                              key={team?._id || index}
                              className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                            >
                              {typeof team === "string" ? team : team.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-400">No team</span>
                        )}
                      </div>
                    </td>

                    {/* Available Status */}
                    <td className="px-5 py-4">
                      <div className="inline-flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            user.availableStatus
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }`}
                        />

                        <span
                          className={`text-sm font-medium ${
                            user.availableStatus
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {user.availableStatus ? "Available" : "Unavailable"}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    {!IsReadOnly && (
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => handleEditUser(user._id)}
                            title="Edit user"
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-orange-100 hover:text-orange-600"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteUser(user._id)}
                            title="Delete user"
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={17} />
                          </button>

                          <button
                            type="button"
                            title="More actions"
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                          >
                            <MoreHorizontal size={18} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {users.length > 0 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-5 py-3">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium text-gray-900">{users.length}</span>{" "}
            users
          </p>
        </div>
      )}
    </div>
  );
}

export default UserTable;
