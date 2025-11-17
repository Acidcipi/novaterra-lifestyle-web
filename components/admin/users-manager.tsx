"use client"

import type React from "react"

import { useState } from "react"
import { Ban, Edit, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { User } from "@/lib/types"

const mockUsers: User[] = [
  {
    id: "1",
    email: "john@example.com",
    name: "John Doe",
    dni: "12345678A",
    role: "user",
    visitedProperties: ["1", "2"],
    favoriteProperties: ["1"],
    createdAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "2",
    email: "jane@example.com",
    name: "Jane Smith",
    dni: "87654321B",
    role: "user",
    visitedProperties: ["2", "3", "4"],
    favoriteProperties: ["2", "3"],
    createdAt: "2025-01-10T14:30:00Z",
  },
  {
    id: "3",
    email: "admin@example.com",
    name: "Admin User",
    dni: "11111111C",
    role: "admin",
    visitedProperties: [],
    favoriteProperties: [],
    createdAt: "2024-12-01T09:00:00Z",
  },
]

export function UsersManager() {
  const [users, setUsers] = useState(mockUsers)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dni: "",
    role: "user" as "user" | "admin" | "owner",
  })

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      dni: user.dni,
      role: user.role,
    })
    setIsFormOpen(true)
  }

  const handleBlock = (id: string) => {
    if (confirm("Are you sure you want to block this user?")) {
      alert("User blocked functionality would be implemented here")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u)))
    }

    setIsFormOpen(false)
    setEditingUser(null)
    setFormData({ name: "", email: "", dni: "", role: "user" })
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-bold text-white">Manage Users</h2>
        <p className="text-gray-400 mt-2">Total users: {users.length}</p>
      </div>

      {isFormOpen && (
        <div className="mb-6 bg-[#1F1F1F] border border-[#D4AF37]/20 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-serif font-bold text-[#D4AF37]">Edit User</h3>
            <button onClick={() => setIsFormOpen(false)} className="text-white hover:text-[#D4AF37]">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-white">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-black border-[#D4AF37]/20 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-black border-[#D4AF37]/20 text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dni" className="text-white">
                  DNI/Passport
                </Label>
                <Input
                  id="dni"
                  value={formData.dni}
                  onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                  className="bg-black border-[#D4AF37]/20 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="role" className="text-white">
                  Role
                </Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full bg-black border border-[#D4AF37]/20 text-white rounded-md px-3 py-2"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="owner">Owner</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90">
                Update User
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
                className="border-[#D4AF37]/20 text-white hover:bg-[#D4AF37]/10"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-[#1F1F1F] border border-[#D4AF37]/20 rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-white">{user.name}</h3>
              <p className="text-gray-400 text-sm">{user.email}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                <span>DNI: {user.dni}</span>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    user.role === "admin"
                      ? "bg-[#D4AF37] text-black"
                      : user.role === "owner"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-700 text-white"
                  }`}
                >
                  {user.role.toUpperCase()}
                </span>
                <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(user)}
                className="text-white hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
                title="Edit user"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleBlock(user.id)}
                className="text-white hover:text-red-500 hover:bg-red-500/10"
                title="Block user"
              >
                <Ban className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
