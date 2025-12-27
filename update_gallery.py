import os
import glob

gallery_dir = r'c:\Users\LENOVO\Desktop\ismash\assets\gallery'
gallery_html_path = r'c:\Users\LENOVO\Desktop\ismash\gallery.html'
index_html_path = r'c:\Users\LENOVO\Desktop\ismash\index.html'

# 1. Get List of Images
image_files = [f for f in os.listdir(gallery_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
image_files.sort() # Ensure consistent order

print(f"Found {len(image_files)} images.")

# 2. Generate HTML Tags
img_tags_list = []
for img in image_files:
    img_path = f"assets/gallery/{img}"
    tag = f'<img src="{img_path}" loading="lazy" alt="Gallery Image">'
    img_tags_list.append(tag)

all_images_html = "\n            ".join(img_tags_list)

# 3. Update gallery.html
with open(gallery_html_path, 'r', encoding='utf-8') as f:
    gallery_content = f.read()

start_marker = '<div class="full-gallery-grid">'
end_marker = '</div>'
start_idx = gallery_content.find(start_marker)
end_idx = gallery_content.find(end_marker, start_idx + len(start_marker))

if start_idx != -1 and end_idx != -1:
    new_gallery_content = gallery_content[:start_idx + len(start_marker)] + \
                          "\n            " + all_images_html + "\n        " + \
                          gallery_content[end_idx:]
    with open(gallery_html_path, 'w', encoding='utf-8') as f:
        f.write(new_gallery_content)
    print("Updated gallery.html")
else:
    print("Could not find marker in gallery.html")

# 4. Update index.html (Marquee)
# For marquee, we usually verify if we need to duplicate all.
# The CSS animation scrolls to translateX(-50%). This implies the content width should be double what we see?
# No, standard implementation: Content is [A, B, C, A, B, C]. We scroll from 0 to -50% (which is the length of A,B,C).
# So we need to duplicate the entire list once.

double_images_html = all_images_html + "\n            " + all_images_html

with open(index_html_path, 'r', encoding='utf-8') as f:
    index_content = f.read()

start_marker_idx = '<div class="gallery-track">'
end_marker_idx = '</div>'

# Note: index.html might have multiple divs? We need to find the specific gallery-track one.
start_pos = index_content.find(start_marker_idx)
if start_pos != -1:
    end_pos = index_content.find(end_marker_idx, start_pos + len(start_marker_idx))
    
    if end_pos != -1:
        new_index_content = index_content[:start_pos + len(start_marker_idx)] + \
                            "\n                    " + double_images_html + "\n                " + \
                            index_content[end_pos:]
        with open(index_html_path, 'w', encoding='utf-8') as f:
            f.write(new_index_content)
        print("Updated index.html")
    else:
        print("Could not find closing div for gallery-track in index.html")
else:
    print("Could not find gallery-track in index.html")
