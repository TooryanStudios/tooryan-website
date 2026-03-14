# Tooryan Studios Website Deployment Guide

## 🚀 Automated Website Updates

This guide explains how to update the Tooryan Studios website automatically using Git and GitHub Actions.

---

## 📋 Quick Update Steps

### Step 1: Make Your Changes
- Edit files in the `tooryan-website` folder using Windsurf
- Add new pages, update content, modify styles, etc.

### Step 2: Stage Your Changes
```bash
git add .
```

### Step 3: Commit Your Changes
```bash
git commit -m "Describe your changes here"
```
**Examples:**
- `git commit -m "Update homepage with new project showcase"`
- `git commit -m "Fix contact form styling"`
- `git commit -m "Add new testimonial section"`

### Step 4: Push to GitHub
```bash
git push origin main
```

### Step 5: 🎉 Automatic Deployment
- GitHub Actions triggers automatically
- Website updates within 1-2 minutes
- Visit `https://tooryan.net` to see changes

---

## 🎯 One-Line Command (Advanced)

For quick updates, you can combine all steps:
```bash
git add . && git commit -m "Your update message" && git push origin main
```

---

## 📁 Important File Locations

### Website Files
- **Main page**: `index.html`
- **Styles**: Inside `<style>` tags in `index.html`
- **Images**: Add to same folder as `index.html`

### Deployment Configuration
- **Workflow**: `.github/workflows/deploy.yml`
- **Repository**: `https://github.com/TooryanStudios/tooryan-website`

---

## 🔍 Troubleshooting

### If Deployment Fails
1. Check GitHub Actions: `https://github.com/TooryanStudios/tooryan-website/actions`
2. Look for error messages in the workflow log
3. Common issues:
   - Network connectivity problems
   - File permission issues
   - Syntax errors in HTML/CSS

### If Website Doesn't Update
1. Wait 2-3 minutes (deployment takes time)
2. Clear browser cache (Ctrl+F5)
3. Check if GitHub Actions completed successfully

---

## 💡 Pro Tips

### Commit Message Best Practices
- **Be descriptive**: "Add new client logo section" vs "Update"
- **Use present tense**: "Fix navigation menu" vs "Fixed navigation"
- **Keep it concise**: Max 50-72 characters

### Before Pushing
- **Test locally**: Open `index.html` in browser
- **Check spelling**: Proofread all text content
- **Validate HTML**: Ensure tags are properly closed

### Workflow Status
- **Green checkmark** ✅ = Deployment successful
- **Red X** ❌ = Check the error log
- **Yellow circle** 🟡 = Deployment in progress

---

## 🆘 Emergency Manual Upload

If automated deployment fails completely:
1. Access HostGator cPanel
2. Go to File Manager
3. Navigate to `/public_html`
4. Upload files manually
5. Contact support if needed

---

## 📞 Support Information

### HostGator FTP Credentials (for reference)
- **Server**: `ftp.tooryan.net`
- **Username**: `mn8z8k6e`
- **Password**: Your cPanel password
- **Directory**: `/public_html`

### GitHub Repository
- **URL**: `https://github.com/TooryanStudios/tooryan-website`
- **Actions**: `https://github.com/TooryanStudios/tooryan-website/actions`

---

## 🎉 Success!

You now have a fully automated website deployment system. No more manual uploads required!

**Remember**: `git add . && git commit -m "Your message" && git push origin main`

---

*Last updated: 2024*
*Website: https://tooryan.net*
*Repository: https://github.com/TooryanStudios/tooryan-website*
