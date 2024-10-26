# Contributing to Awesome Tools Directory

We welcome contributions! There are two ways to add a new tool:

## 1. Using the Submit Form

1. Visit our [Awesome Tools Directory](https://awesome.tools).
2. Fill out the "Submit a New Tool" form in the header with the tool's details.
3. Click "Submit Pull Request" to open a pre-filled pull request on GitHub.
4. Review your changes and submit the pull request.

## 2. Manual Contribution

If you prefer to contribute manually:

1. Fork the repository: [https://github.com/nichetools/awesome-tools](https://github.com/nichetools/awesome-tools)
2. Create a new branch: `git checkout -b add-new-tool`
3. Add your tool to the `_data/tools.yml` file following this format:

   ```yaml
   - title: "Your Tool Name"
     link: "https://yourtool.com"
     description: "A brief description of your tool"
     tags: 
       - Tag1
       - Tag2
   ```

4. Commit your changes: `git commit -am 'Add new tool: Tool Name'`
5. Push to your fork: `git push origin add-new-tool`
6. Submit a pull request to the main repository: [https://github.com/nichetools/awesome-tools/pulls](https://github.com/nichetools/awesome-tools/pulls)

Please ensure your tool meets these criteria:
- It must be free or have a free tier lasting at least 1 year.
- It should be a general development tool, not specific to a single language or framework.

By contributing, you agree that your contributions will be licensed under the MIT License.
