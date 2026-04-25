"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Save, LogOut, KeyRound, Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { CropModal } from "@/components/crop-modal"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [cropConfig, setCropConfig] = useState<{ imageSrc: string, field: string, aspectRatio: number } | null>(null)
  const router = useRouter()

  // Change Password State
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [changingPassword, setChangingPassword] = useState(false)

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(resData => {
        setData(resData)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (res.ok) {
        alert("Data saved successfully!")
      } else {
        alert("Failed to save data.")
      }
    } catch (err) {
      alert("An error occurred while saving.")
    }
    setSaving(false)
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordMsg(null)
    setChangingPassword(true)
    try {
      const res = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword })
      })
      const result = await res.json()
      if (res.ok) {
        setPasswordMsg({ type: 'success', text: 'Password berhasil diubah! Gunakan password baru untuk login berikutnya.' })
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        setPasswordMsg({ type: 'error', text: result.error || 'Gagal mengubah password.' })
      }
    } catch {
      setPasswordMsg({ type: 'error', text: 'Terjadi kesalahan koneksi.' })
    }
    setChangingPassword(false)
  }

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append("file", file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const result = await res.json()
      if (res.ok) callback(result.url)
    } catch (err) {
      alert("An error occurred during upload.")
    }
  }

  const handleFileSelectForCrop = (e: React.ChangeEvent<HTMLInputElement>, field: string, aspectRatio: number) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setCropConfig({ imageSrc: reader.result as string, field, aspectRatio })
    }
    reader.readAsDataURL(file)
  }

  const handleCropComplete = async (croppedFile: File) => {
    if (!cropConfig) return
    const formData = new FormData()
    formData.append("file", croppedFile)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const result = await res.json()
      if (res.ok) {
        updateProfile(cropConfig.field, result.url)
      } else {
        alert("Upload failed: " + result.error)
      }
    } catch (e) {
      alert("An error occurred during crop upload.")
    }
    setCropConfig(null)
  }

  if (loading) return <div className="p-10 flex justify-center mt-20">Loading...</div>
  if (!data) return <div className="p-10 flex justify-center mt-20">Failed to load data.</div>

  // Profile Updates
  const updateProfile = (field: string, value: string) => {
    setData({ ...data, profile: { ...data.profile, [field]: value } })
  }

  // Social Media Updates
  const addSocial = () => {
    setData({ ...data, socialMedia: [...data.socialMedia, { platform: "New Platform", url: "", icon: "Link" }] })
  }
  const updateSocial = (index: number, field: string, value: string) => {
    const newSocial = [...data.socialMedia]
    newSocial[index][field] = value
    setData({ ...data, socialMedia: newSocial })
  }
  const removeSocial = (index: number) => {
    const newSocial = data.socialMedia.filter((_: any, i: number) => i !== index)
    setData({ ...data, socialMedia: newSocial })
  }

  // Documentation Updates
  const updateDocImage = (index: number, value: string) => {
    const newDocs = [...data.documentation]
    newDocs[index] = value
    setData({ ...data, documentation: newDocs })
  }
  const addDocImage = () => {
    setData({ ...data, documentation: [...data.documentation, ""] })
  }
  const removeDocImage = (index: number) => {
    const newDocs = data.documentation.filter((_: any, i: number) => i !== index)
    setData({ ...data, documentation: newDocs })
  }

  // Portfolio Updates
  const addPortfolioItem = (categoryIndex: number) => {
    const newPortfolio = [...data.portfolio]
    newPortfolio[categoryIndex].items.unshift({ name: "New Project", link: "", description: "Description" })
    setData({ ...data, portfolio: newPortfolio })
  }
  const updatePortfolioItem = (categoryIndex: number, itemIndex: number, field: string, value: string) => {
    const newPortfolio = [...data.portfolio]
    newPortfolio[categoryIndex].items[itemIndex][field] = value
    setData({ ...data, portfolio: newPortfolio })
  }
  const removePortfolioItem = (categoryIndex: number, itemIndex: number) => {
    const newPortfolio = [...data.portfolio]
    newPortfolio[categoryIndex].items.splice(itemIndex, 1)
    setData({ ...data, portfolio: newPortfolio })
  }

  // Skills Updates
  const addSkill = (type: 'main' | 'additional') => {
    const newSkills = { ...data.skills }
    newSkills[type] = [...newSkills[type], { name: "New Skill", level: 50, icon: "Star", color: "from-blue-500 to-cyan-500" }]
    setData({ ...data, skills: newSkills })
  }
  const updateSkill = (type: 'main' | 'additional', index: number, field: string, value: any) => {
    const newSkills = { ...data.skills }
    newSkills[type][index][field] = value
    setData({ ...data, skills: newSkills })
  }
  const removeSkill = (type: 'main' | 'additional', index: number) => {
    const newSkills = { ...data.skills }
    newSkills[type].splice(index, 1)
    setData({ ...data, skills: newSkills })
  }

  // Certifications Updates
  const addCert = () => {
    setData({ ...data, certifications: [...data.certifications, { year: "2024", title: "New Cert", issuer: "Issuer", icon: "Award", color: "primary", borderColor: "border-l-primary" }] })
  }
  const updateCert = (index: number, field: string, value: string) => {
    const newCerts = [...data.certifications]
    newCerts[index][field] = value
    setData({ ...data, certifications: newCerts })
  }
  const removeCert = (index: number) => {
    const newCerts = data.certifications.filter((_: any, i: number) => i !== index)
    setData({ ...data, certifications: newCerts })
  }

  return (
    <div className="container max-w-5xl mx-auto py-10 mt-20">
      {cropConfig && (
        <CropModal 
          imageSrc={cropConfig.imageSrc} 
          aspectRatio={cropConfig.aspectRatio} 
          onCropComplete={handleCropComplete} 
          onCancel={() => setCropConfig(null)} 
        />
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your entire portfolio here.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleLogout} className="gap-2 border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save All Changes"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="documentation">Gallery</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={data.profile.name} onChange={(e) => updateProfile("name", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Avatar Image (1:1 Aspect Ratio)</Label>
                  <div className="flex items-center gap-4">
                    {data.profile.avatarUrl && <img src={data.profile.avatarUrl} alt="Avatar" className="w-12 h-12 rounded-full object-cover border" />}
                    <Input type="file" accept="image/*" onChange={(e) => handleFileSelectForCrop(e, "avatarUrl", 1)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Banner Image (3:1 Aspect Ratio)</Label>
                  <div className="flex flex-col gap-2">
                    {data.profile.bannerUrl && <img src={data.profile.bannerUrl} alt="Banner" className="w-full h-24 object-cover rounded-md border" />}
                    <Input type="file" accept="image/*" onChange={(e) => handleFileSelectForCrop(e, "bannerUrl", 3)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Bio (Before Skills)</Label>
                  <Textarea value={data.profile.bioPrefix} onChange={(e) => updateProfile("bioPrefix", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Bio (After Skills)</Label>
                  <Textarea value={data.profile.bioSuffix} onChange={(e) => updateProfile("bioSuffix", e.target.value)} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Social Media Links</CardTitle>
                <Button variant="outline" size="sm" onClick={addSocial}><Plus className="w-4 h-4 mr-2" />Add Link</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.socialMedia.map((social: any, index: number) => (
                  <div key={index} className="flex gap-4 items-center border p-3 rounded-xl">
                    <div className="space-y-1 flex-1">
                      <Label>Platform Name</Label>
                      <Input value={social.platform} onChange={(e) => updateSocial(index, "platform", e.target.value)} />
                    </div>
                    <div className="space-y-1 flex-1">
                      <Label>URL</Label>
                      <Input value={social.url} onChange={(e) => updateSocial(index, "url", e.target.value)} />
                    </div>
                    <div className="space-y-1 w-24">
                      <Label>Icon Name</Label>
                      <Input value={social.icon} onChange={(e) => updateSocial(index, "icon", e.target.value)} placeholder="Youtube..." />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeSocial(index)} className="mt-5">
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="portfolio">
          <div className="space-y-6">
            {data.portfolio.map((category: any, catIndex: number) => (
              <Card key={catIndex}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{category.title}</CardTitle>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => addPortfolioItem(catIndex)}>
                    <Plus className="w-4 h-4 mr-2" />Add Item
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.items.map((item: any, itemIndex: number) => (
                    <div key={itemIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-xl relative group">
                      <Button variant="destructive" size="icon" className="absolute -top-3 -right-3 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removePortfolioItem(catIndex, itemIndex)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <div className="space-y-2">
                        <Label>Project Name</Label>
                        <Input value={item.name} onChange={(e) => updatePortfolioItem(catIndex, itemIndex, "name", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Link URL</Label>
                        <Input value={item.link} onChange={(e) => updatePortfolioItem(catIndex, itemIndex, "link", e.target.value)} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Description</Label>
                        <Input value={item.description} onChange={(e) => updatePortfolioItem(catIndex, itemIndex, "description", e.target.value)} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documentation">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Documentation Photos</CardTitle>
              <Button variant="outline" size="sm" onClick={addDocImage}><Plus className="w-4 h-4 mr-2" />Add Photo</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.documentation.map((url: string, index: number) => (
                <div key={index} className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-muted border">
                    {url && <img src={url} alt={`Doc ${index}`} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <Input type="file" accept="image/*" onChange={(e) => handleUpload(e, (newUrl) => updateDocImage(index, newUrl))} />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeDocImage(index)}>
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Main Skills (Expertise)</CardTitle>
                <Button variant="outline" size="sm" onClick={() => addSkill('main')}><Plus className="w-4 h-4 mr-2" />Add Skill</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.skills.main.map((skill: any, index: number) => (
                  <div key={index} className="flex gap-4 items-center border p-3 rounded-xl">
                    <div className="space-y-1 flex-1">
                      <Label>Skill Name</Label>
                      <Input value={skill.name} onChange={(e) => updateSkill('main', index, "name", e.target.value)} />
                    </div>
                    <div className="space-y-1 w-24">
                      <Label>Level (1-100)</Label>
                      <Input type="number" min="1" max="100" value={skill.level} onChange={(e) => updateSkill('main', index, "level", parseInt(e.target.value))} />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeSkill('main', index)} className="mt-5">
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Additional Skills</CardTitle>
                <Button variant="outline" size="sm" onClick={() => addSkill('additional')}><Plus className="w-4 h-4 mr-2" />Add Skill</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.skills.additional.map((skill: any, index: number) => (
                  <div key={index} className="flex gap-4 items-center border p-3 rounded-xl">
                    <div className="space-y-1 flex-1">
                      <Label>Skill Name</Label>
                      <Input value={skill.name} onChange={(e) => updateSkill('additional', index, "name", e.target.value)} />
                    </div>
                    <div className="space-y-1 w-24">
                      <Label>Level (1-100)</Label>
                      <Input type="number" min="1" max="100" value={skill.level} onChange={(e) => updateSkill('additional', index, "level", parseInt(e.target.value))} />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeSkill('additional', index)} className="mt-5">
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="certifications">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Certifications</CardTitle>
              <Button variant="outline" size="sm" onClick={addCert}><Plus className="w-4 h-4 mr-2" />Add Cert</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.certifications.map((cert: any, index: number) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-xl relative group">
                  <Button variant="destructive" size="icon" className="absolute -top-3 -right-3 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeCert(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Input value={cert.year} onChange={(e) => updateCert(index, "year", e.target.value)} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Title</Label>
                    <Input value={cert.title} onChange={(e) => updateCert(index, "title", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Issuer</Label>
                    <Input value={cert.issuer} onChange={(e) => updateCert(index, "issuer", e.target.value)} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-primary" />
                Ganti Password Admin
              </CardTitle>
              <CardDescription>Perbarui kata sandi untuk akses Admin Dashboard Anda.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-5 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Password Saat Ini</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrent ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Masukkan password saat ini"
                      className="pr-10"
                      required
                    />
                    <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Password Baru</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimal 6 karakter"
                      className="pr-10"
                      required
                    />
                    <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Ketik ulang password baru"
                      className="pr-10"
                      required
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {newPassword && confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">Password tidak cocok.</p>
                  )}
                </div>

                {passwordMsg && (
                  <div className={`flex items-start gap-2 text-sm px-4 py-3 rounded-xl border ${
                    passwordMsg.type === 'success'
                      ? 'bg-green-500/10 border-green-500/20 text-green-500'
                      : 'bg-red-500/10 border-red-500/20 text-red-500'
                  }`}>
                    {passwordMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" /> : <KeyRound className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                    <span>{passwordMsg.text}</span>
                  </div>
                )}

                <Button type="submit" disabled={changingPassword} className="gap-2">
                  <KeyRound className="w-4 h-4" />
                  {changingPassword ? "Menyimpan..." : "Simpan Password Baru"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
